'use client';

import { useState } from 'react';
import InsuranceHero from "@/components/InsuranceHero";
import InsuranceProducts from "@/components/InsuranceProducts";
import InsuranceFeatures from "@/components/InsuranceFeatures";
import InsurancePartners from "@/components/InsurancePartners";
import InsuranceCTA from "@/components/InsuranceCTA";
import SharesFormModal from "@/components/SharesFormModal";

export default function InsurancePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    share: null,
    actionType: 'apply'
  });

  const openModal = (insuranceType = 'Insurance', actionType = 'apply') => {
    setModalData({
      share: {
        name: insuranceType,
        price: 'Contact for Quote',
        lotSize: 1,
        minInvestment: '5,000'
      },
      actionType: actionType
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData({
      share: null,
      actionType: 'apply'
    });
  };

  return (
    <main className="flex flex-col min-h-screen">
      <InsuranceHero openModal={openModal} />
      <InsuranceProducts openModal={openModal} />
      <InsuranceFeatures openModal={openModal} />
      <InsurancePartners openModal={openModal} />
      <InsuranceCTA openModal={openModal} />

      <SharesFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        share={modalData.share}
        actionType={modalData.actionType}
      />
    </main>
  );
}