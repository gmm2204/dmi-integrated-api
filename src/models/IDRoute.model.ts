export class IDRoute {
  title: string = "";
  url: string = "";
  file: string = "";
  query: string = "";

  constructor(title: string, url: string, file: string) {
    this.title = title;
    this.url = url;
    this.file = file;
  }
}