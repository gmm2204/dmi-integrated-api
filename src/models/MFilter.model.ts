export class MFilter {
  filter_facility: string = '-1';
  filter_date_range_start: string = '-1';
  filter_date_range_end: string = '-1';
  filter_year: string = '-1';
  filter_epi_week_start: string = '-1';
  filter_epi_week_end: string = '-1';

  constructor(filter: MFilter) {
    Object.assign(this, filter);
  }
}