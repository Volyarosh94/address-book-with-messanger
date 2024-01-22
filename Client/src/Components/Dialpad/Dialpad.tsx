import { ChangeEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import "react-phone-input-2/lib/style.css";
import BackspaceIcon from "@mui/icons-material/Backspace";
import CallIcon from "@mui/icons-material/Call";
import CallEndIcon from "@mui/icons-material/CallEnd";
import PI, { PhoneInputProps } from "react-phone-input-2";

const PhoneInput: React.FC<PhoneInputProps> = (PI as any).default || PI;

interface Props {
  selectedPhone: string;
  onCallClick: (value: string) => void;
  onHangUpClick: () => void;
}

export const DialPad = ({
  selectedPhone,
  onCallClick,
  onHangUpClick,
}: Props) => {
  const [phoneNumber, setPhoneNumber] = useState(selectedPhone);
  const [isCalling, setIsCalling] = useState<boolean>(false);

  const handleDigitClick = (value: string) => {
    setPhoneNumber((phoneNumber) => phoneNumber.concat(value));
  };
  const handleBackspaceClick = () => {
    setPhoneNumber((phoneNumber) => phoneNumber.slice(0, -1));
  };

  const handleDialClick = () => {
    onCallClick(phoneNumber);
    setIsCalling(true);
  };
  const handleHangUpClick = () => {
    onHangUpClick();
    setIsCalling(false);
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  useEffect(() => {
    setPhoneNumber(selectedPhone);
  }, [selectedPhone]);

  const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", ""];

  return (
    <motion.div
      layout
      initial={{ bottom: "50px" }}
      animate={{ bottom: 100 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col w-72 absolute right-5 p-4 rounded-xl border border-main-gray bg-white drop-shadow-md"
    >
      <PhoneInput
        country={"us"}
        placeholder={"Enter phone number"}
        value={phoneNumber}
        disableDropdown
        enableLongNumbers
        inputProps={{
          autoFocus: true,
        }}
        containerStyle={{ width: "100%" }}
        inputStyle={{ width: "100%" }}
        onChange={(value, data, event, formattedValue) =>
          handleInputChange(event)
        }
      />
      <div className="flex flex-wrap justify-around mt-2">
        {digits.map((digit, i) => (
          <button
            key={digit + i}
            className={`digit ${digit !== "" ? "digitActive" : ""}`}
            onClick={() => handleDigitClick(digit)}
            disabled={digit === ""}
          >
            {digit}
          </button>
        ))}
      </div>
      <div className="flex justify-around">
        <div
          className={`flex justify-center items-center p-4 w-[72px] h-[72px] cursor-pointer bg-red hover:bg-dark-red rounded-full ${
            isCalling ? "visible" : "invisible"
          }`}
          onClick={handleHangUpClick}
        >
          <CallEndIcon fontSize="large" />
        </div>
        <div
          className="flex justify-center items-center p-4 w-[72px] h-[72px] cursor-pointer bg-green hover:bg-dark-green rounded-full"
          onClick={handleDialClick}
        >
          <CallIcon fontSize="large" />
        </div>
        <div
          className="flex justify-center items-center p-4 w-[72px] h-[72px] cursor-pointer active:bg-main-gray rounded-full"
          onClick={handleBackspaceClick}
        >
          <BackspaceIcon fontSize="large" />
        </div>
      </div>
    </motion.div>
  );
};
