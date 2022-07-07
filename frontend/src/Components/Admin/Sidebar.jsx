import React from 'react';
import {Link} from 'react-router-dom';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Dashboard from './Dashboard';


const Sidebar = () => {
  return (
    <>
        <TreeView
            aria-label="multi-select"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            multiSelect
            sx={{ height: 'auto', flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
            >
            
            <Link to="/admin/dashboard" className='text-decoration-none text-white'>
                <p> <DashboardIcon /> Dashboard</p>
            </Link>

            <TreeItem nodeId="1" label="Products" className="mb-3">
                <Link to="/admin/products" className='text-decoration-none text-white '>
                    <TreeItem nodeId="2" label="All " className="my-2"/>
                </Link>
                <Link to="/admin/product" className='text-decoration-none text-white '>
                    <TreeItem nodeId="3" label="Create " className='' />
                </Link>
            </TreeItem>
            
            <Link to="/admin/orders" className='text-decoration-none text-white'>
                <p> <ListAltIcon /> Orders</p>
            </Link>
            <Link to="/admin/users" className='text-decoration-none text-white'>
                <p> <PeopleIcon /> Users</p>
            </Link>
            <Link to="/admin/reviews" className='text-decoration-none text-white'>
                <p> <RateReviewIcon /> Reviews</p>
            </Link>

        </TreeView>
    </>
  )
}

export default Sidebar