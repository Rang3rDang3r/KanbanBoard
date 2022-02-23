import Column from "./Column.js";

export default class Kanban {
  constructor(root) {
    // To ref the root class
    this.root = root;

    Kanban.columns().forEach(column => {
      // Create an instance of column class
      const columnView = new Column(column.id, column.title);

      this.root.appendChild(columnView.elements.root);
    })
  }

  static columns() {
    return [
      {
        id: 1,
        title: "Not Started"
      },
      {
        id: 2,
        title: "In Progress"
      },
      {
        id: 3,
        title: "Completed"
      }
    ];
  }
}
