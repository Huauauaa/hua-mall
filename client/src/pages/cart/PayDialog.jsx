import { Alert, Image, Modal } from 'antd';

import { formatMoney } from '../../utils';
import wechatPay from '../../assets/images/Wechat_pay.jpeg';

function PayDialog({ onClose, onOk, total = 0 }) {
  return (
    <Modal visible={true} onCancel={onClose} closable={false} onOk={onOk}>
      <Alert
        message={`请支付${formatMoney(total)}元`}
        type="info"
        style={{ marginBottom: '5px' }}
      />
      <Image src={wechatPay} preview={false} />
    </Modal>
  );
}

export default PayDialog;
