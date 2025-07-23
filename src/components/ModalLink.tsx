import { Modal } from "antd";

type Props = {
  show: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  url: string;
};

export default function ModalLink({
  show,
  handleOk,
  handleCancel,
  url,
}: Props) {
  return (
    <>
      <Modal
        title="You Are Leaving This Site"
        closable={{ "aria-label": "Custom Close Button" }}
        open={show}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          The link you clicked will take you to an external website. Only
          proceed if you trust the destination.
        </p>
        
        <p style={{color: "#1c46b2ff"}}>{url}</p>
        <p>Are you sure you want to continue?</p>
      </Modal>
    </>
  );
}
