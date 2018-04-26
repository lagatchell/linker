export class ShareRequest {
    constructor(
        public categoryId: string,
        public ownerId: string,
        public senderEmail: string,
        public receiverEmail: string,
        public title: string,
        public id?: string
    ){}
}