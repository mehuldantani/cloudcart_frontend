import React from 'react'
import Layout from '../../components/layout/layout'
import Usermenu from '../../components/layout/usermenu'
const Dashboard = () => {
  return (
    <Layout>
         <div className='container-fluid p-3'>
          <div className='row'>
            <div className='col-md-3'>
                <Usermenu />
            </div>
            <div className='col-md-9'>Content</div>
          </div>
        </div>
    </Layout>
  )
}

export default Dashboard;