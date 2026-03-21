# MiniProGame4 - Inventory Management System (Java)

`miniProGame4` is a console-based Inventory Management System built in Java.

It lets you:
- Add new items with name, quantity, and price
- Remove items by name
- View all items in inventory

## Project Structure

```text
miniProGame4/
├── src/
│   ├── Main.java
│   └── com/inventory/
│       ├── Inventory.java
│       ├── InventorySystem.java
│       └── Item.java
├── out/
├── .idea/
├── .gitignore
└── Inventory System Project.iml
```

## How to Run

### Prerequisites
- JDK 8 or later
- `javac` and `java` available in PATH

### Compile

Run from inside `miniProGame4`:

```bash
javac -d out src/Main.java src/com/inventory/Inventory.java src/com/inventory/InventorySystem.java src/com/inventory/Item.java
```

### Run

```bash
java -cp out Main
```

You will see a menu to add, remove, and view inventory items.
