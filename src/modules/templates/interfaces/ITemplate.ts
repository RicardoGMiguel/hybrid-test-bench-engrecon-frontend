export interface ITemplate {
  id: string;
  name: string;
  screen_name: string;
  file_template: string | null;
  created_at: Date;
  updated_at: Date;
  file_template_url: string | null;
}
