export class LinkItem {
    constructor(
        public linkUrl: string,
        public alias?: string,
        public shortDescription?: string,
        public id?:string,
        public categoryId?: string,
        public order?: number
    ){}
}
