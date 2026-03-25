import {
    CONTENTFUL_ACCESS_TOKEN,
    CONTENTFUL_BASE,
    CONTENTFUL_NEXT_CACHE_TAG,
    MAX_CONTENTFUL_TRIES,
} from '../config/contentful';
import { IS_PRODUCTION } from '@/client/config/common';

console.log({
    CONTENTFUL_ACCESS_TOKEN,
    CONTENTFUL_BASE,
    IS_PRODUCTION,
});

class ContentfulService {
    constructor() {}

    async waitForSeconds() {
        return new Promise(resolve => {
            setTimeout(resolve, seconds * 1000);
        });
    }

    async fetch(url = 'entries', data = {}, opts = {}) {
        data.access_token = CONTENTFUL_ACCESS_TOKEN;
        const searchParams = new URLSearchParams(data);
        const finalURL = `${CONTENTFUL_BASE}${url}?${searchParams}`;

        if (IS_PRODUCTION) opts.next = { tags: [CONTENTFUL_NEXT_CACHE_TAG] };
        else opts.next = { revalidate: 5 };

        // fetch w/advanced error handling
        try {
            let res = await fetch(finalURL, opts);
            if (res.status === 429) {
                let retries = 1;
                while (retries < MAX_CONTENTFUL_TRIES) {
                    const waitTime = res?.headers?.get('X-Contentful-RateLimit-Reset') || 10;
                    console.log(
                        `[ContentfulService] fetch is throttled, trying again after ${waitTime} seconds, try #${retries}`,
                    );
                    await this.waitForSeconds(waitTime);
                    res = await fetch(finalURL, opts);
                    if (res.status !== 429) break;
                    retries++;
                }
                console.log(`[ContentfulService] Done trying after #${retries}, got status ${res.status}`);
            }
            if (res.status !== 200) {
                return {
                    success: false,
                    fatal: true,
                };
            }
            return await res.json();
        } catch (error) {
            return {
                success: false,
                fatal: true,
            };
        }
    }

    overloadObjectWithIncludes(res) {
        if (!res?.items?.length || (!res?.includes?.Entry?.length && !res?.includes?.Asset?.length)) return;
        const idToEntry = {};

        if (res?.includes?.Entry?.length)
            for (let entry of res.includes.Entry) {
                idToEntry[entry.sys.id] = entry;
            }

        if (res?.includes?.Asset?.length)
            for (let entry of res.includes.Asset) {
                idToEntry[entry.sys.id] = entry;
            }

        const replaceLinkObjects = obj => {
            if (obj && typeof obj === 'object') {
                if (Array.isArray(obj)) {
                    return obj.map(item => replaceLinkObjects(item, idToEntry));
                } else {
                    if (obj.sys && obj.sys.type === 'Link' && ['Entry', 'Asset'].includes(obj.sys.linkType)) {
                        const newObject = idToEntry[obj.sys.id];
                        if (newObject) {
                            return newObject;
                        }
                    }
                    for (const key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            obj[key] = replaceLinkObjects(obj[key], idToEntry);
                        }
                    }
                }
            }
            return obj;
        };

        replaceLinkObjects(res);
    }

    async getEntryById(entryId) {
        const res = await this.fetch(`entries`, {
            'sys.id': entryId,
        });
        this.overloadObjectWithIncludes(res);
        return res?.items?.[0] || null;
    }

    // async getAllContentfulPages() {
    //     const res = await this.fetch(`entries`, {
    //         content_type: 'page',
    //         include: 10,
    //         'fields.attachToProductTag[exists]': false,
    //         'fields.isArticle[ne]': true,
    //     });
    //     this.overloadObjectWithIncludes(res);
    //     return res?.items;
    // }
}

export default new ContentfulService();
