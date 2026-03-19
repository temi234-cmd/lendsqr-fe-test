import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockUsers } from '../../data/mockUsers';
import { saveUserToStorage, getUserFromStorage } from '../../utils/storage';
import type { User } from '../../types';
import './UserDetails.scss';

const tabs = ['General Details', 'Documents', 'Bank Details', 'Loans', 'Savings', 'App and System'];

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('General Details');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!id) return;

    const stored = getUserFromStorage(id);
    if (stored) {
      setUser(stored);
    } else {
      const found = mockUsers.find((u) => u.id === id);
      if (found) {
        saveUserToStorage(found);
        setUser(found);
      }
    }
  }, [id]);

  const handleStatusUpdate = (newStatus: 'Blacklisted' | 'Active') => {
    if (!user) return;
    const updatedUser = { ...user, status: newStatus };
    setUser(updatedUser);
  };

  const renderStars = (tier: number) =>
    [1, 2, 3].map((star) => (
      <svg key={star} width="16" height="16" viewBox="0 0 16 16">
        <path
          d="M8 1L9.5 6H15L10.5 9.5L12 14.5L8 11.5L4 14.5L5.5 9.5L1 6H6.5L8 1Z"
          fill={star <= tier ? '#E9B200' : 'none'}
          stroke="#E9B200"
        />
      </svg>
    ));

  if (!user) {
    return (
      <div className="user-details">
       <div className="user-details__back" onClick={() => navigate('/dashboard')}>
  ← Back to Users
</div>
        <p style={{ marginTop: '20px' }}>User not found.</p>
      </div>
    );
  }

  return (
    <div className="user-details">
      {/* BACK */}
      <div className="user-details__back"  onClick={() => navigate('/dashboard')}>
        ← Back to Users
      </div>

      {/* HEADER */}
      <div className="user-details__header">
        <h2>User Details</h2>

        <div className="header-actions">
          <button className="blacklist" onClick={() => handleStatusUpdate('Blacklisted')}>
            Blacklist User
          </button>
          <button className="activate" onClick={() => handleStatusUpdate('Active')}>
            Activate User
          </button>
        </div>
      </div>

      {/* CARD */}
      <div className="user-details__card">

        {/* PROFILE */}
        <div className="user-details__profile">
          <div className="profile-avatar">
            <img src={user.avatar} alt={user.fullName} />
          </div>

          <div className="profile-info">
            <h3>{user.fullName}</h3>
            <p>{user.id}</p>
          </div>

          <div className="profile-tier">
            <p>User’s Tier</p>
            <div className="stars">{renderStars(user.tier)}</div>
          </div>

          <div className="profile-account">
            <h4>{user.accountBalance}</h4>
            <p>{user.accountNumber}/{user.bank}</p>
          </div>
        </div>

        {/* TABS */}
        <div className="user-details__tabs">
          {tabs.map((tab) => (
            <div
              key={tab}
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
         </div>
        {/* CONTENT */}
        <div className="user-details__content-card">
        <div className="user-details__content">

          {activeTab === 'General Details' && (
            <>
              {/* PERSONAL */}
              <Section title="Personal Information">
                <Item label="Full Name" value={user.fullName} />
                <Item label="Phone Number" value={user.phoneNumber} />
                <Item label="Email Address" value={user.email} />
                <Item label="BVN" value={user.bvn} />
                <Item label="Gender" value={user.gender} />
                <Item label="Marital Status" value={user.maritalStatus} />
                <Item label="Children" value={user.children} />
                <Item label="Type of Residence" value={user.typeOfResidence} />
              </Section>

              {/* EDUCATION */}
              <Section title="Education and Employment">
                <Item label="Level of Education" value={user.levelOfEducation} />
                <Item label="Employment Status" value={user.employmentStatus} />
                <Item label="Sector of Employment" value={user.sectorOfEmployment} />
                <Item label="Duration of Employment" value={user.durationOfEmployment} />
                <Item label="Office Email" value={user.officeEmail} />
                <Item
                  label="Monthly Income"
                  value={`${user.monthlyIncome?.[0]} - ${user.monthlyIncome?.[1]}`}
                />
                <Item label="Loan Repayment" value={user.loanRepayment} />
              </Section>

              {/* SOCIALS */}
              <Section title="Socials">
                <Item label="Twitter" value={user.twitter} />
                <Item label="Facebook" value={user.facebook} />
                <Item label="Instagram" value={user.instagram} />
              </Section>

              {/* GUARANTOR */}
              <Section title="Guarantor">
                <Item label="Full Name" value={user.guarantorName} />
                <Item label="Phone Number" value={user.guarantorPhone} />
                <Item label="Email Address" value={user.guarantorEmail} />
                <Item label="Relationship" value={user.guarantorRelationship} />

                <div style={{ marginTop: '24px' }} />

                <Item label="Full Name" value={user.guarantor2Name} />
                <Item label="Phone Number" value={user.guarantor2Phone} />
                <Item label="Email Address" value={user.guarantor2Email} />
                <Item label="Relationship" value={user.guarantor2Relationship} />
              </Section>
            </>
          )}

          {activeTab !== 'General Details' && (
            <div className="empty-state">
              No data available for this section yet.
            </div>
          )}

        </div>
  </div>
    </div>
  );
};

export default UserDetails;

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="user-details__section">
    <h4>{title}</h4>
    <div className="user-details__grid">{children}</div>
  </div>
);

const Item: React.FC<{ label: string; value?: string | number }> = ({ label, value }) => (
  <div className="detail-item">
    <label>{label}</label>
    <p>{value || 'N/A'}</p>
  </div>
);