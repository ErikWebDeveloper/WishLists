import { FormOutlined } from "@ant-design/icons";
import ListForm from "../components/ListForm";
import ListTable from "../components/ListsTable";
import { useLists } from "../hooks/useLists";
import GenericDrawerPage from "../layouts/GenericDrawerPage";
//import ListTable from "../components/ListsTableAb";

export default function ListPage() {
  const {
    lists,
    loading,
    loadingCRUD,
    error,
    clearErrors,
    addList,
    deleteList,
    updateList,
  } = useLists();

  const onSubmit = async (values: any, isEdit: boolean, item?: List) => {
    if (isEdit && item) {
      await updateList({ ...item, ...values.list });
    } else {
      await addList(values.list);
    }
  };

  return (
    <>
      <GenericDrawerPage<
        List,
        {
          data: List[];
          loading: boolean;
          loadingCRUD: boolean;
          onDelete: (id: string) => void;
          onEdit: (item: List) => void;
        }
      >
        icon={<FormOutlined />}
        tooltip="Create a new wish list"
        drawerTitle="Create a wish list"
        drawerTitleEdit="Edit wish list"
        error={error}
        clearErrors={clearErrors}
        loadingCRUD={loadingCRUD}
        onSubmit={onSubmit}
        fieldKey="list"
        table={
          <ListTable
            data={lists}
            loading={loading}
            loadingCRUD={loadingCRUD}
            onDelete={deleteList}
            onEdit={() => {}}
          />
        }
        formComponent={
          <ListForm
            formHook={undefined as any}
            onFinish={() => {}}
            isEdit={false}
            onLoad={false}
          />
        }
      />
    </>
  );
}
