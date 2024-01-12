import { Contact } from "./pages/Contacts";

export const sorter = function (a: Contact, b: Contact) {
  if (a.name < b.name) {
    return -1;
  } else if (a.name > b.name) {
    return 1;
  } else {
    return 0;
  }
};
