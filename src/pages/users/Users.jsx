import { useTranslation } from "react-i18next";
import MainLayout from "../../components/layouts/mainLayout/MainLayout";
import SearchSection from "../../components/SearchSection";
import TableGrid from "../../components/TableGrid";
import UserDialog from "./UserDialog";
import { useEffect, useState } from "react";
import { IconButton, Stack } from "@mui/material";
import SneakBar from "../../components/sneakbar/SneakBar";
import DeleteIcon from "@mui/icons-material/Delete";

function Users() {
  const { t } = useTranslation();
  const [users, setUsers] = useState([
    {
      id: 900,
      name: "Sevilay",
      surname: "Yılmaz",
      email: "yilmaz.sevilay@gmail.com",
      areaCode: "+90",
      phoneNumber: "5423957516",
      city: "İstanbul",
      district: "Beylikdüzü",
      address: "Marmara Mah. İhlas Cad. No:12/7",
      branch: "Beylikdüzü-Marmara Şubesi",
    },
    {
      id: 901,
      name: "Selin",
      surname: "Toprak",
      email: "selin.toprak@example.com",
      areaCode: "+90",
      phoneNumber: "5362345678",
      city: "İzmir",
      district: "Buca",
      address: "Çamlık Mah. İzmir Cad. No:20/6",
      branch: "Buca-Merkez Şubesi",
    },
    {
      id: 902,
      name: "Can",
      surname: "Korkmaz",
      email: "can.korkmaz@example.com",
      areaCode: "+90",
      phoneNumber: "5318765432",
      city: "Ankara",
      district: "Yenimahalle",
      address: "Fatih Mah. Ankara Cad. No:5/3",
      branch: "Yenimahalle-Merkez Şubesi",
    },
    {
      id: 903,
      name: "Ceren",
      surname: "Demir",
      email: "ceren.demir@example.com",
      areaCode: "+90",
      phoneNumber: "5393456789",
      city: "İstanbul",
      district: "Kadıköy",
      address: "Fenerbahçe Mah. İstanbul Cad. No:8/1",
      branch: "Kadıköy-Merkez Şubesi",
    },
    {
      id: 904,
      name: "Burak",
      surname: "Kaya",
      email: "burak.kaya@example.com",
      areaCode: "+90",
      phoneNumber: "5329876543",
      city: "Ankara",
      district: "Çankaya",
      address: "Bahçelievler Mah. Ankara Cad. No:10/4",
      branch: "Çankaya-Merkez Şubesi",
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);
  const [loader, setLoader] = useState(true);
  const OpenModal = (data) => {
    setIsOpen(true);
    setData(data);
  };
  const columns = [
    { field: "id", headerName: "ID", width: 100, flex: 0.5 },
    {
      field: "name-surname",
      headerName: `${t("name-surname")}`,
      width: 100,
      flex: 0.75,
      valueGetter: (params) => {
        const { name, surname } = params.row;
        if (name && surname) {
          return `${name} ${surname}`;
        } else if (name) {
          return name;
        } else if (surname) {
          return surname;
        } else {
          return "";
        }
      },
    },
    {
      field: "branch",
      headerName: `${t("branch")}`,
      width: 100,
      flex: 1,
    },
    {
      field: "email",
      headerName: `${t("email")}`,
      width: 100,
      flex: 0.75,
    },
    {
      field: "phoneNumber",
      headerName: `${t("phone-number")}`,
      width: 100,
      flex: 0.75,
      valueGetter: (params) => {
        const { areaCode, phoneNumber } = params.row;
        if (areaCode && phoneNumber) {
          return areaCode + " " + phoneNumber;
        } else if (areaCode) {
          return areaCode;
        } else if (phoneNumber) {
          return phoneNumber;
        } else {
          return "";
        }
      },
    },
    {
      field: "city-district",
      headerName: `${t("city-district")}`,
      width: 100,
      flex: 1,
      valueGetter: (params) => {
        const { city, district } = params.row;
        if (city && district) {
          return city + "/" + district;
        } else if (city) {
          return city;
        } else if (district) {
          return district;
        } else {
          return "";
        }
      },
    },
    {
      field: "action",
      headerName: "",
      type: "number",
      width: 100,
      flex: 0.5,
      renderCell: (cellValues) => (
        <Stack direction="row" spacing={-1}>
          <UserDialog
            buttonName="edit"
            users={users}
            setUsers={setUsers}
            setLoader={setLoader}
            data={cellValues.row}
          />
          <IconButton color="error" onClick={() => OpenModal(cellValues.row)}>
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      ),
    },
  ];
  useEffect(() => {
    setTimeout(() => {
      if (loader) setLoader(false);
    }, 300);
  }, [loader]);
  return (
    <MainLayout>
      {isOpen && (
        <SneakBar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          data={data}
          items={users}
          setItems={setUsers}
          type="user"
        />
      )}
      <div className="w-full bg-white mb-8 p-6 rounded-2xl border border-[#90caf975]">
        <h2 className="text-xl font-medium">{t("users")}</h2>
      </div>
      <div className="w-full h-[600px] flex flex-col bg-white p-6 rounded-2xl border border-[#90caf975]">
        <div className="pb-2 mb-2 border-b flex justify-between">
          <SearchSection />
          <UserDialog
            users={users}
            buttonName="new-user"
            setLoader={setLoader}
            setUsers={setUsers}
          />
        </div>
        {loader ? (
          <div className="w-full flex-1  flex justify-center items-center">
            <h1>Yükleniyor</h1>
          </div>
        ) : (
          <TableGrid
            rows={users}
            columns={columns}
            rowCount={10}
            paginationMode="server"
          />
        )}
      </div>
    </MainLayout>
  );
}

export default Users;
