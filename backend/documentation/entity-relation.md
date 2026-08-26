```mermaid
erDiagram
    Users
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ ORDER_ITEM : contains
    PRODUCT ||--o{ ORDER_ITEM : includes
    Users {
        objectId _Id
        string email
        string passwordHash
        string name
    }

```
