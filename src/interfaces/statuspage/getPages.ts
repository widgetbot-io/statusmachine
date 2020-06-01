export interface GetPages {
	id: string;
	created_at: Date;
	updated_at: Date;
	name: string;
	page_description: string;
	headline: string;
	branding: string;
	subdomain: string;
	domain: string;
	url: string;
	support_url: string;
	hidden_from_search: boolean;
	allow_page_subscribers: boolean;
	allow_incident_subscribers: boolean;
	allow_email_subscribers: boolean;
	allow_sms_subscribers: boolean;
	allow_rss_atom_feeds: boolean;
	allow_webhook_subscribers: boolean;
	notifications_from_email: string;
	notifications_email_footer: string;
	activity_score: number;
	twitter_username: string;
	viewers_must_be_team_members: boolean;
	ip_restrictions: string;
	city: string;
	state: string;
	country: string;
	time_zone: string;
	css_body_background_color: string;
	css_font_color: string;
	css_light_font_color: string;
	css_greens: string;
	css_yellows: string;
	css_oranges: string;
	css_blues: string;
	css_reds: string;
	css_border_color: string;
	css_graph_color: string;
	css_link_color: string;
	favicon_logo: string;
	transactional_logo: string;
	hero_cover: string;
	email_logo: string;
	twitter_logo: string;
}