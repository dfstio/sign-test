import { Col, Row, RowProps, Space, Typography } from 'antd';
import { Card, ContractForm } from '../../components';
import { MailFilled, PhoneFilled } from '@ant-design/icons';

const { Link, Text, Paragraph } = Typography;

const ROW_PROPS: RowProps = {
  gutter: [
    { xs: 8, sm: 16, md: 24, lg: 32 },
    { xs: 8, sm: 16, md: 24, lg: 32 },
  ],
};

const textStyles: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
};

const cardStyles: React.CSSProperties = {
  height: '100%',
};

export const TestPage = () => {
  return (
    <div>
      <Row {...ROW_PROPS}>
        <Col span={24}>
          <Card title="Test contract">
            <ContractForm />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
