export interface Metadata {
    [key: string]: { [key: string]: any } // TODO: ?
}

export interface Components {
    component_id: string;
}

export interface Component {
    id: string;
    page_id: string;
    group_id: string;
    created_at: Date;
    updated_at: Date;
    group: boolean;
    name: string;
    description: string;
    position: number;
    status: string;
    showcase: boolean;
    only_show_if_degraded: boolean;
    automation_email: string;
}

export enum Status {
    RESOLVED = 'resolved',
    INVESTIGATING = 'investigating',
    IDENTIFIED = 'identified',
    SCHEDULED = 'scheduled',
    IN_PROGRESS = 'in_progress',
    VERIFYING = 'verifying',
    MONITORING = 'monitoring',
    COMPLETED = 'completed',
    POSTMORTEM = 'postmortem',
    UPDATE = 'update'
}

export interface IncidentUpdate {
    id: string;
    incident_id: string;
    affected_components: string[];
    body: string;
    created_at: Date;
    custom_tweet: string;
    deliver_notifications: boolean;
    display_at: Date;
    status: string;
    tweet_id: string;
    twitter_updated_at: Date;
    updated_at: Date;
    wants_twitter_update: boolean;
}

export enum ImpactOverride {
    MINOR = 'minor',
    CRITICAL = 'critical',
    NONE = 'none',
    MAINTENANCE = 'maintenance',
    MAJOR = 'major'
}
