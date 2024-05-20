import { Button, Col, Form, FormProps, Input, Row } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { useStylesContext } from '../../context';

type Props = FormProps;

export const ContractForm = ({ ...others }: Props) => {
  const stylesContext = useStylesContext();

  return (
    <div>
      <Form layout="vertical" {...others}>
        <Row {...stylesContext?.rowProps}>
          <Col sm={24} lg={12}>
            <Form.Item label="Value" tooltip="This is a required field">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" icon={<SendOutlined />}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
