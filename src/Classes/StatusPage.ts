import axios from 'axios';
import {Envuments} from 'envuments';
import {CreateIncidentBody, GetIncidentsReturn, NewIncidentReturn, GetPages} from '../interfaces/statuspage';

interface StatusPageSettings {
    pageId: string,
    oauthKey: string
}

interface StatusPageNoPageSettings {
    oauthKey: string
}

export class StatusPage {
    private static client = axios.create({
        baseURL: Envuments.get('API_URL', 'https://api.statuspage.io/v1/'),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    static async getPages(settings: StatusPageNoPageSettings) {
        return this.client.get<GetPages[]>('pages', {
            headers: {
                'Authorization': `OAuth ${settings.oauthKey}`,
            }
        })
    }

    static async getIncidents(settings: StatusPageSettings) {
        return this.client.get<GetIncidentsReturn[]>(`pages/${settings.pageId}/incidents`, {
            headers: {
                'Authorization': `OAuth ${settings.oauthKey}`,
            }
        })
    }

    static async createIncident(body: CreateIncidentBody, settings: StatusPageSettings) {
        return this.client.post<NewIncidentReturn>(`pages/${settings.pageId}/incidents`, body, {
            headers: {
                'Authorization': `OAuth ${settings.oauthKey}`,
            }
        });
    }
}
