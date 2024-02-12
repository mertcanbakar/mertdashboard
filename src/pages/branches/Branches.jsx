import { useTranslation } from "react-i18next";
import MainLayout from "../../components/layouts/mainLayout/MainLayout";
import SearchSection from "../../components/SearchSection";
import TableGrid from "../../components/TableGrid";
import BranchDialog from "./BranchDialog";
import { useEffect, useState } from "react";
import { IconButton, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SneakBar from "../../components/sneakbar/SneakBar";

function Branches() {
  const { t } = useTranslation();
  const [loader, setLoader] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);
  const [branches, setBranches] = useState([
    {
      id: 713,
      branchName: "Beylikdüzü Yakuplu Şubesi",
      storeManager: "Hakan Deniz",
      areaCode: "+90",
      phoneNumber: "5307138296",
      email: "hakandeniz@example.com",
      city: "İstanbul",
      district: "Beylikdüzü",
      address: "Yakuplu Mah. Marmara Cad. No:13/7",
    },
    {
      id: 714,
      branchName: "Kadıköy Merkez Şubesi",
      storeManager: "Ayşe Yılmaz",
      areaCode: "+90",
      phoneNumber: "5329876543",
      email: "ayseyilmaz@example.com",
      city: "İstanbul",
      district: "Kadıköy",
      address: "Merkez Mah. Kadıköy Cad. No:5/3",
    },
    {
      id: 715,
      branchName: "Üsküdar Salacak Şubesi",
      storeManager: "Ahmet Demir",
      areaCode: "+90",
      phoneNumber: "5341234567",
      email: "ahmetdemir@example.com",
      city: "İstanbul",
      district: "Üsküdar",
      address: "Salacak Mah. Üsküdar Cad. No:10/2",
    },
    {
      id: 716,
      branchName: "Sarıyer Merkez Şubesi",
      storeManager: "Zeynep Çelik",
      areaCode: "+90",
      phoneNumber: "5367890123",
      email: "zeynepcelik@example.com",
      city: "İstanbul",
      district: "Sarıyer",
      address: "Merkez Mah. Sarıyer Cad. No:7/5",
    },
    {
      id: 717,
      branchName: "Bağcılar Merkez Şubesi",
      storeManager: "Mustafa Kaya",
      areaCode: "+90",
      phoneNumber: "5383456789",
      email: "mustafakaya@example.com",
      city: "İstanbul",
      district: "Bağcılar",
      address: "Merkez Mah. Bağcılar Cad. No:12/4",
    },
  ]);
  const OpenModal = (data) => {
    setIsOpen(true);
    setData(data);
  };
  const columns = [
    { field: "id", headerName: "ID", width: 100, flex: 0.5 },
    {
      field: "branchName",
      headerName: `${t("branch-name")}`,
      width: 100,
      flex: 1,
    },
    {
      field: "storeManager",
      headerName: `${t("store-manager")}`,
      width: 100,
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: `${t("phone-number")}`,
      width: 100,
      flex: 1,
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
      field: "email",
      headerName: `${t("email")}`,
      width: 100,
      flex: 1,
    },
    {
      field: "address",
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
          <BranchDialog
            buttonName="edit"
            branches={branches}
            setBranches={setBranches}
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
    if (loader) setLoader(false);
  }, [loader]);
  return (
    <MainLayout>
      {isOpen && (
        <SneakBar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          data={data}
          items={branches}
          setItems={setBranches}
          type="branch"
        />
      )}
      <div className="w-full bg-white mb-8 p-6 rounded-2xl border border-[#90caf975]">
        <h2 className="text-xl font-medium">{t("branches")}</h2>
      </div>
      <div className="w-full h-[600px] flex flex-col bg-white p-6 rounded-2xl border border-[#90caf975]">
        <div className="pb-2 mb-2 border-b flex justify-between">
          <SearchSection />
          <BranchDialog
            buttonName="new-branch"
            branches={branches}
            setBranches={setBranches}
            setLoader={setLoader}
          />
        </div>
        {loader ? (
          <div className="w-full flex-1  flex justify-center items-center">
            <h1>Yükleniyor</h1>
          </div>
        ) : (
          <TableGrid
            rows={branches}
            columns={columns}
            rowCount={10}
            paginationMode="server"
          />
        )}
      </div>
    </MainLayout>
  );
}

export default Branches;
