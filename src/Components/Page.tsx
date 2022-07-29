import Pagination from '@mui/material/Pagination';

type Props = {
  currentPage: number
  totalPages: number
  handlePaginationChange: any
}

export default function PaginationOutlined(props: Props) {
  return (
    <Pagination onChange={props.handlePaginationChange} page={props.currentPage} count={props.totalPages} style={{ paddingTop: 10 }} variant="outlined" color="primary" />
  );
}
