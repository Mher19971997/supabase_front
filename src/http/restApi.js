import { $host } from './index';

const getTables = async () => {
  const { data } = await $host.get(`/api/tables`);
  return data;
};

const getTableColumn = async (tableName, query) => {
  const { data } = await $host.get(`/${tableName}?${query}`);
  return data;
};

const getRowById = async ({ tableName, id }) => {
  const { data } = await $host.get(`/${tableName}/${id}`);
  return data;
};

const updateRowById = async ({ tableName, id, inputDto }) => {
  const { data } = await $host.patch(`/${tableName}/${id}`, inputDto);
  return data;
};

const deleteRowById = async ({ tableName, id }) => {
  const { data } = await $host.delete(`/${tableName}/${id}`);
  return data;
};

export { getTables, getTableColumn, deleteRowById, getRowById, updateRowById };
