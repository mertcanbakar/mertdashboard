/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import DialogForm from "../../components/modal/DialogForm";
import { Select, MenuItem, TextField, FormControl } from "@mui/material";

import { useTranslation } from "react-i18next";
import { useState } from "react";
import { toast } from "react-toastify";

export default function BranchDialog({
  buttonName,
  data,
  setBranches,
  setLoader,
  branches,
}) {
  const { t } = useTranslation();
  const [rowID, setRowID] = useState(718);
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
      branchName: null,
      storeManager: null,
      areaCode: "+90",
      phoneNumber: null,
      email: null,
      city: null,
      district: null,
      address: null,
    },
    onSubmit: (values) => {
      console.log(values);
      const updatedValues = { ...values, id: rowID };
      setBranches([...branches, updatedValues]);
      setLoader(true);
      setRowID(rowID + 1);
      formik.resetForm();
      toast.success(t("success-create-branch"), {
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
    const updatedData = branches.map((branch) => {
      if (branch.id === values.id) {
        return {
          ...branch,
          ...values,
        };
      }
      return branch;
    });
    setBranches(updatedData);
    setLoader(true);
    toast.success(t("success-edit-branch"), {
      position: "top-right",
      autoClose: 3000,
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
      modalTitle={buttonName === "edit" ? "edit-branch" : "create-branch"}
      saveClick={formik.handleSubmit}
      editClick={() => handleEdit(formik.values)}
      cancelClick={cancelForm}
    >
      <div className="flex flex-col gap-y-3">
        <TextField
          id="branchName"
          name="branchName"
          size="small"
          label={t("branch-name")}
          fullWidth
          value={formik.values.branchName}
          onChange={formik.handleChange}
        />
        <TextField
          id="storeManager"
          name="storeManager"
          size="small"
          label={t("store-manager")}
          fullWidth
          value={formik.values.storeManager}
          onChange={formik.handleChange}
        />
        <div className="w-full flex gap-x-2">
          <FormControl size="small" style={{ width: "200px" }}>
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
            type="number"
            label={t("phone-number")}
            fullWidth
            value={formik.values.phoneNumber}
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
      </div>
    </DialogForm>
  );
}
