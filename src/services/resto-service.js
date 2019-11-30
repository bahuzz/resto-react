export default class RestoService {
    constructor() {
        this._apiBase = 'http://localhost:3004';
    }
    

    getMenuItems = async () => {
        const res = await fetch(`${this._apiBase}/menu`);
        if (!res.ok) {
            throw new Error(`Could not fetch url received ${res.status}`);
        }
        return await res.json();
    }
}