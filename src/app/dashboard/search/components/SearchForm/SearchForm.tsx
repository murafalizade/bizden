import { RootState, useAppDispatch, useAppSelector } from '@/shared/store/store';
import React from 'react';
import { Button, Checkbox, Col, Form, Input, Row, Select } from 'antd';
import { CATEGORY_LIST } from '@app/(authless)/register/libs/constants';
import { OptGroup } from 'rc-select';
import { resetFilter, setFilter } from '@app/dashboard/search/libs/search-slice';
import { IFilterPayload } from '@app/dashboard/search/libs/models';

interface SearchFormProps {}

export const SearchForm: React.FC<SearchFormProps> = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state: RootState) => state.search.filter);

  const handleReset = () => {
    dispatch(resetFilter());
    form.setFieldsValue({
      searchText: undefined,
      category: undefined,
      city: undefined,
      type: undefined,
      isFree: false,
      targetUserTypes: [],
    });
  };

  const handleSearch = (values: IFilterPayload) => {
    dispatch(setFilter(values));
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleSearch} initialValues={filters}>
      <Row gutter={16}>
        <Col xs={24} sm={12} md={8}>
          <Form.Item name="searchText" label="Biznes adı">
            <Input placeholder="Biznes adı" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item name="category" label="Kateqoriya">
            <Select
              placeholder="Kateqoriya seçin"
              style={{ width: '100%' }}
              showSearch
              optionFilterProp="children"
              allowClear
            >
              {CATEGORY_LIST.map(group => (
                <OptGroup key={group.label} label={group.label}>
                  {group.options.map(option => (
                    <Select.Option key={option} value={option}>
                      {option}
                    </Select.Option>
                  ))}
                </OptGroup>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item name="city" label="Şəhər">
            <Select allowClear placeholder="Şəhər seçin">
              <Select.Option value="Bakı">Bakı</Select.Option>
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item label="Biznes növü">
            <Form.Item name="type" noStyle>
              <Checkbox.Group>
                <Row>
                  <Col>
                    <Checkbox value={0}>Sahibkar</Checkbox>
                  </Col>
                  <Col>
                    <Checkbox value={1}>Vətəndaş</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item name="isFree" label="Endirim növü" valuePropName="checked">
            <Checkbox>Yalnız Pulsuz</Checkbox>
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={8}>
          <Form.Item name="targetUserTypes" label="Hədəf istifadəçilər">
            <Checkbox.Group>
              <Row>
                <Checkbox value="Veteran">Veteranlar üçün</Checkbox>
                <Checkbox value="Student">Tələbələr üçün</Checkbox>
              </Row>
            </Checkbox.Group>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={handleReset} style={{ marginRight: 10 }}>
          Təmizlə
        </Button>
        <Button type="primary" htmlType="submit">
          Axtar
        </Button>
      </Form.Item>
    </Form>
  );
};
