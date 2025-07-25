import { GiftOutlined } from "@ant-design/icons";
import WishForm from "../components/WishForm";
import WishTable from "../components/WishTable";
import { useWishes } from "../hooks/useWishes";
import GenericDrawerPage from "../layouts/GenericDrawerPage";

export default function WishPage() {
  const {
    listName,
    wishes,
    addWish,
    deleteWish,
    updateWish,
    error,
    clearErrors,
    loading,
    loadingCRUD,
  } = useWishes();

  const onSubmit = async (values: any, isEdit: boolean, item?: Wish) => {
    if (isEdit && item) {
      await updateWish({ ...item, ...values.wish });
    } else {
      await addWish(values.wish);
    }
  };

  return (
    <GenericDrawerPage<
      Wish,
      {
        data: Wish[];
        listName: string;
        loading: boolean;
        loadingCRUD: boolean;
        onDelete: (id: string) => void;
        onEdit: (wish: Wish) => void;
      }
    >
      icon={<GiftOutlined />}
      tooltip="Create a new wish"
      drawerTitle="Create a wish"
      drawerTitleEdit="Edit a wish"
      error={error}
      clearErrors={clearErrors}
      loadingCRUD={loadingCRUD}
      onSubmit={onSubmit}
      fieldKey="wish"
      table={
        <WishTable
          listName={listName}
          data={wishes}
          loading={loading}
          loadingCRUD={loadingCRUD}
          onDelete={deleteWish}
          onEdit={() => {}} // este se sobrescribe internamente
        />
      }
      formComponent={
        <WishForm
          formHook={undefined as any}
          onFinish={() => {}}
          isEdit={false}
          onLoad={false}
        />
      }
    />
  );
}
