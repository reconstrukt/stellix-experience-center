import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';

class TempFileSystemService {
    FILE_PATH = path.join(os.tmpdir(), 'content-version.json');

    async getVersion() {
        try {
            const raw = await fs.readFile(this.FILE_PATH, 'utf8');
            const data = JSON.parse(raw);
            return typeof data.version === 'number' ? data.version : 0;
        } catch {
            return 0;
        }
    }

    async setVersion(version) {
        await fs.writeFile(this.FILE_PATH, JSON.stringify({ version }), 'utf8');
    }
}

export default new TempFileSystemService();
