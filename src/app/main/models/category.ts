export class Category {
  constructor(
    public title,
    public id?,
    public parentCategoryId?,
    public expanded?
  ) {}
}
