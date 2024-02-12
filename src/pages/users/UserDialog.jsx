/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import DialogForm from "../../components/modal/DialogForm";
import { FormControl, MenuItem, Select, TextField } from "@mui/material";

import { useTranslation } from "react-i18next";
import { useState } from "react";
import { toast } from "react-toastify";

export default function UserDialog({
  buttonName,
  data,
  users,
  setUsers,
  setLoader,
}) {
  const { t } = useTranslation();
  const [rowID, setRowID] = useState(905);

  const areaCodes = [
    {
      code: "+90",
      flag: "🇹🇷",
    },
    {
      code: "+994",
      flag: "🇦🇿",
    },
    {
      code: "+44",
      flag: "🇬🇧",
    },
    {
      code: "+1",
      flag: "🇺🇸",
    },
    {
      code: "+49",
      flag: "🇩🇪",
    },
  ];
  const formik = useFormik({
    initialValues: data ?? {
      name: null,
      surname: null,
      branch: null,
      email: null,
      areaCode: "+90",
      phoneNumber: null,
      city: null,
      district: null,
      address: null,
    },
    onSubmit: (values) => {
      console.log(values);
      const updatedValues = { ...values, id: rowID };
      setUsers([...users, updatedValues]);
      setLoader(true);
      setRowID(rowID + 1);
      formik.resetForm();
      toast.success(t("success-create-user"), {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
  });
  const handleEdit = (values) => {
    const updatedData = users.map((user) => {
      if (user.id === values.id) {
        return {
          ...user,
          ...values,
        };
      }
      return user;
    });
    setUsers(updatedData);
    setLoader(true);
    toast.success(t("success-edit-user"), {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    formik.resetForm();
  };
  const cancelForm = () => {
    formik.resetForm();
  };

  return (
    <DialogForm
      buttonName={buttonName}
      processType={buttonName}
      modalTitle={buttonName === "edit" ? "edit-user" : "create-user"}
      saveClick={formik.handleSubmit}
      editClick={() => handleEdit(formik.values)}
      cancelClick={cancelForm}
    >
      <div className="flex flex-col gap-y-3">
        <div className="w-full flex gap-x-2">
          <TextField
            id="name"
            name="name"
            size="small"
            label={t("name")}
            fullWidth
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <TextField
            id="surname"
            name="surname"
            size="small"
            label={t("surname")}
            fullWidth
            value={formik.values.surname}
            onChange={formik.handleChange}
          />
        </div>
        <TextField
          id="email"
          name="email"
          size="small"
          label={t("email")}
          fullWidth
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <div className="w-full flex gap-x-2">
          <FormControl style={{ width: "200px" }} size="small">
            <Select
              id="areaCode"
              value={formik.values.areaCode}
              defaultValue={areaCodes[0].code}
              onChange={(event) => {
                formik.setFieldValue("areaCode", event.target.value);
              }}
            >
              {areaCodes.map((item) => (
                <MenuItem key={item.code} value={item.code}>
                  {item.flag} {item.code}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="phoneNumber"
            name="phoneNumber"
            size="small"
            label={t("phone-number")}
            fullWidth
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
          />
        </div>
        <div className="w-full flex gap-x-2">
          <TextField
            id="city"
            name="city"
            size="small"
            label={t("city")}
            fullWidth
            value={formik.values.city}
            onChange={formik.handleChange}
          />
          <TextField
            id="district"
            name="district"
            size="small"
            label={t("district")}
            fullWidth
            value={formik.values.district}
            onChange={formik.handleChange}
          />
        </div>
        <TextField
          id="address"
          name="address"
          size="small"
          label={t("address")}
          fullWidth
          value={formik.values.address}
          onChange={formik.handleChange}
        />
        <TextField
          id="branch"
          name="branch"
          size="small"
          label={t("branch")}
          fullWidth
          value={formik.values.branch}
          onChange={formik.handleChange}
        />
      </div>
    </DialogForm>
  );
}
