import { IProjectEmployee } from './IProjectEmployee';

export interface IAttendanceChart {
  presents: number;
  absents: number;
  total: number;
}

export interface IAttendanceList {
  test_employees: IProjectEmployee[];
  attendance_list_chart: IAttendanceChart;
}

export interface IFormUpdateAttendanceList {
  present_project_employee_ids: (string | undefined)[];
  absent_project_employee_ids: (string | undefined)[];
}
