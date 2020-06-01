import {Component, Components, ImpactOverride, IncidentUpdate, Metadata, Status} from './incident';

interface CreateIncident {
    name: string;
    status: Status;
    impact_override: ImpactOverride;
    scheduled_for: Date;
    scheduled_until: Date;
    scheduled_remind_prior: boolean;
    scheduled_auto_in_progress: boolean;
    scheduled_auto_completed: boolean;
    metadata: Metadata;
    deliver_notifications: boolean;
    auto_transition_deliver_notifications_at_end: boolean;
    auto_transition_deliver_notifications_at_start: boolean;
    auto_transition_to_maintenance_state: boolean;
    auto_transition_to_operational_state: boolean;
    auto_tweet_at_beginning: boolean;
    auto_tweet_on_completion: boolean;
    auto_tweet_on_creation: boolean;
    auto_tweet_one_hour_before: boolean;
    backfill_date: string;
    backfilled: boolean;
    body: string;
    components: Components;
    component_ids: string[];
    scheduled_auto_transition: boolean;
}

export interface CreateIncidentBody {
    incident: CreateIncident;
}

export interface NewIncidentReturn {
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

