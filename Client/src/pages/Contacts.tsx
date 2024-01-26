import React, { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { ContactItem } from "../Components/Contacts/ContactItem";
import { ContactInfo } from "../Components/Contacts/ContactInfo";
import { ToolBar } from "../Components/Contacts/ToolBar";
import { people } from "../FakeData";
import { sorter } from "../utils";

export interface Contact {
  id: number;
  name: string;
  status: string;
  statusHoursAgo: number;
  picture: string;
  mobilePhone: string;
  workPhone: string;
}

export const Contacts = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [checkedContacts, setCheckedContacts] = useState<Array<Contact>>([]);
  const [checkListShow, setCheckListShow] = useState<boolean>(false);

  const peopleList: Contact[] = people.sort(sorter);
  const [contactsList, setContactsList] = useState<Contact[]>(peopleList);

  const getFirstLetter = (name: string) => name.charAt(0).toUpperCase();
  const isMobile = useMediaQuery("(max-width: 800px)");

  return (
    <>
      <div className="h-screen w-full">
        <div className="w-full h-full flex bg-white">
          <div
            className={`${
              isMobile && selectedContact ? "hidden" : "flex"
            } w-full customMd:w-80 flex-col bg-bg-gray`}
          >
            <ToolBar
              checkedContacts={checkedContacts}
              checkListShow={checkListShow}
              setCheckListShow={setCheckListShow}
              setContactsList={setContactsList}
              selectedContact={selectedContact}
              setSelectedContact={setSelectedContact}
              setCheckedContacts={setCheckedContacts}
            />
            <div
              className={
                "flex-col h-[calc(100%-48px)] overflow-y-auto py-[7px] mt-[50px] w-full customMd:w-80"
              }
            >
              {contactsList.map((person, i, arr) => (
                <React.Fragment key={person.id}>
                  {i === 0 ||
                  getFirstLetter(person.name) !==
                    getFirstLetter(arr[i - 1].name) ? (
                    <div className="w-full pl-3 mt-2 first-of-type:mt-0">
                      <div className="flex justify-center items-center text-[15px] w-8 h-8 p-2 my-3 first-of-type:mt-0 bg-[#3d474d] text-white">
                        {getFirstLetter(person.name)}
                      </div>
                    </div>
                  ) : null}
                  <ContactItem
                    person={person}
                    checkListShow={checkListShow}
                    checkedContacts={checkedContacts}
                    setCheckedContacts={setCheckedContacts}
                    selectedContact={selectedContact}
                    setSelectedContact={setSelectedContact}
                  />
                </React.Fragment>
              ))}
            </div>
          </div>
          {!selectedContact || checkListShow ? (
            <div className="hidden customMd:flex w-full justify-center items-center text-[46px] font-light box-shadow">
              <div className="text-text-gray">No Selection</div>
            </div>
          ) : (
            <ContactInfo selectedContact={selectedContact} />
          )}
        </div>
      </div>
    </>
  );
};
