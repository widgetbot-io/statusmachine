import axios from 'axios';
import {Envuments} from 'envuments';
import {CreateIncidentBody, GetIncidentsReturn, NewIncidentReturn} from '../interfaces/statuspage';

export class StatusPage {
    private static pageId = Envuments.get('PAGE_ID')
    private static client = axios.create({
        baseURL: Envuments.get('API_URL', 'https://api.statuspage.io/v1/'),
        headers: {
            'Authorization': `OAuth ${Envuments.get('OAUTH_KEY')}`,
            'Content-Type': 'application/json'
        }
    })

    static async getIncidents() {
        return this.client.get<GetIncidentsReturn[]>(`pages/${this.pageId}/incidents`)
    }

    static async createIncident(body: CreateIncidentBody) {
        return this.client.post<NewIncidentReturn>(`pages/${this.pageId}/incidents`, body);
    }
}
