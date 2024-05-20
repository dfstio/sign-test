import { useState } from 'react';
import { Button, Col, Form, FormProps, Input, Row } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { useStylesContext } from '../../context';
import { contract } from './contract';

type Props = FormProps;

export const ContractForm = ({ ...others }: Props) => {
  const stylesContext = useStylesContext();
  const [value, setValue] = useState(0);
  const [link, setLink] = useState('');

  const setContractValue = async () => {
    console.log('Value', value);
    const hash = await contract(Number(value));
    console.log('setContractValue result:', hash);
    setLink('https://minascan.io/devnet/tx/' + hash);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (event: any) => {
    console.log('New value', event.target.value);
    setValue(event.target.value);
  };

  return (
    <div>
      <Form layout="vertical" {...others}>
        <Row {...stylesContext?.rowProps}>
          <Col sm={24} lg={12}>
            <Form.Item label="Value" tooltip="This is a required field">
              <Input onChange={onChange} defaultValue={0} type={'number'} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button
            type="primary"
            onClick={setContractValue}
            icon={<SendOutlined />}
          >
            Submit
          </Button>
        </Form.Item>
        <Form.Item label="transaction sent: " name="ink" hidden={link === ''}>
          <div>
            <a href={link} target="_blank">
              {link}
            </a>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
