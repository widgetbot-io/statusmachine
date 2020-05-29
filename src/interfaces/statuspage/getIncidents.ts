import {Component, IncidentUpdate, Metadata} from './incident';

export interface GetIncidentsReturn {
    id: string;
    components: Component[];
    created_at: Date;
    impact: string;
    impact_override: string;
    incident_updates: IncidentUpdate[];
    metadata: Metadata;
    monitoring_at: Date;
    name: string;
    page_id: string;
    postmortem_body: string;
    postmortem_body_last_updated_at: Date;
    postmortem_ignored: boolean;
    postmortem_notified_subscribers: boolean;
    postmortem_notified_twitter: boolean;
    postmortem_published_at: boolean;
    resolved_at: Date;
    scheduled_auto_completed: boolean;
    scheduled_auto_in_progress: boolean;
    scheduled_for: Date;
    scheduled_remind_prior: boolean;
    scheduled_reminded_at: Date;
    scheduled_until: Date;
    shortlink: string;
    status: string;
    updated_at: Date;
}
