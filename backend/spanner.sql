CREATE TABLE Notes (
      NotesId    STRING(1024) NOT NULL,
      AccountId   INT64 NOT NULL,
      Note    STRING(1024)
) PRIMARY KEY (NotesId)