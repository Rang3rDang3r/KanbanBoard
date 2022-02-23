// Allows import to other modules
export default class KanbanAPI {

  // Find column
  static getItems(columnId) {
    // Check columm, checks to see if matches
    const column = read().find(column => column.id == columnId);

    // If nothing, return empty
    if (!column) {
      return [];
    }

    return column.items;
  }

  // Create item
  static insertItem (columnId, content) {
    const data = read();
    const column = data.find(column => column.id == columnId);
    // Set random id and user filled content
    const item = {
      id: Math.floor(Math.random() * 1000000),
      content
    };

    // Throw error if column doesnt exist
    if (!column) {
      throw new Error("Column Does Not Exist");
    }
    // If correct push and save to local
    column.items.push(item);
    save(data);

    return item;
  }

  // Update Item
  static updateItem(itemId, newProps) {
    const data = read();
    // Array destructuring to check function
    const [item, currentColumn] = (() => {
      for (const column of data) {
        // Check if item has same id, return to item const
        const item = column.items.find(item => item.id == itemId);

        if (item) {
          return [item, column];
        }
      }
    })();

    if (!item) {
      throw error ("Item not found");
    }

    // If content not provided, keep the same else update
    item.content = newProps.content === undefined ? item.content : newProps.content;

    // Update column and position if both are provided
    if (newProps.columnId !== undefined && newProps.position !== undefined) {
      // Change column
      const targetColumn = data.find(column => column.id == newProps.columnId);

      if (!targetColumn) {
        throw new Error("Target Column not found");
      }

      // Delete the item from it's current column
      currentColumn.items.splice(currentColumn.items.indexOf(item), 1);

      // Move item into new column and position
      targetColumn.items.splice(newProps.position, 0, item);
    }

    save(data);
  }

  // Delete Item
  static deleteItem(itemId) {
    const data = read();

    // Check if item is in column
    for (const column of data) {
      const item = column.items.find(item => item.id == itemId);

      // If item matches, remove
      if (item) {
        column.items.splice(column.items.indexOf(item), 1);
      }

    }
    save(data);
  }
}


// Reads from local storage
function read() {
  // Set key and json
  const json = localStorage.getItem("kanban-data");

  // First time user
  if (!json) {
    return [
      {
        id: 1,
        items: []
      },
      {
        id: 2,
        items: []
      },
      {
        id: 3,
        items: []
      }
    ];
  }

  // Return
  return JSON.parse(json);

}

// Set data
function save(data) {
  localStorage.setItem("kanban-data", JSON.stringify(data));
}
