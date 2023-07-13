import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Inertia } from '@inertiajs/inertia';
import Dropdown from '@/Components/Dropdown';
import { Link, Head } from '@inertiajs/react';
import { patch, usePage } from '@inertiajs/inertia-react';

export default function Location() {
  const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedRegency, setSelectedRegency] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');
  const [showNextStep, setShowNextStep] = useState(false);

  useEffect(() => {
    fetchProvinces();
  }, []);

  const fetchProvinces = async () => {
    try {
      const response = await axios.get('/location/provinces');
      setProvinces(response.data.provinces);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRegencies = async (provinceId) => {
    try {
      const response = await axios.get(`/location/regencies/${provinceId}`);
      setRegencies(response.data.regencies);
      setSelectedRegency('');
      setSelectedDistrict('');
      setDistricts([]);
      setVillages([]);
      setShowNextStep(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDistricts = async (regencyId) => {
    try {
      const response = await axios.get(`/location/districts/${regencyId}`);
      setDistricts(response.data.districts);
      setSelectedDistrict('');
      setVillages([]);
      setShowNextStep(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchVillages = async (districtId) => {
    try {
      const response = await axios.get(`/location/villages/${districtId}`);
      setVillages(response.data.villages);
      setShowNextStep(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleProvinceChange = (provinceId) => {
    const selectedProvince = provinces.find((province) => province.id === provinceId);
    setSelectedProvince(selectedProvince);
    setSelectedRegency('');
    setSelectedDistrict('');
    setDistricts([]);
    setVillages([]);
    setShowNextStep(false);
    fetchRegencies(provinceId);
  };

  const handleRegencyChange = (regencyId) => {
    const selectedRegency = regencies.find((regency) => regency.id === regencyId);
    setSelectedRegency(selectedRegency);
    setSelectedDistrict('');
    setVillages([]);
    setShowNextStep(false);
    fetchDistricts(regencyId);
  };

  const handleDistrictChange = (districtId) => {
    const selectedDistrict = districts.find((district) => district.id === districtId);
    setSelectedDistrict(selectedDistrict);
    setVillages([]);
    setShowNextStep(false);
    fetchVillages(districtId);
  };

  const handleVillageSelect = (village) => {
    setSelectedVillage(village);
    setShowNextStep(true);
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    patch(route('subscriptions.index'));
  };

  return (
    <div className="w-screen min-h-screen bg-transparent bg-gradient-to-r from-pink-500 via-red-400 to-violet-500">
      <div className="flex flex-col md:w-1/4 mx-10 lg:mx-40 pt-20">
        <div className="text-4xl font-semibold mb-4">Find Locations</div>
        <div className="flex flex-col gap-6">
          <Dropdown>
            <Dropdown.Trigger label={selectedProvince.name || 'Select Province'} />
            <Dropdown.Content>
              <div className="p-2">
                {provinces.map((province) => (
                  <Dropdown.Item
                    key={province.id}
                    value={province.id}
                    onClick={() => handleProvinceChange(province.id)}
                  >
                    {province.name}
                  </Dropdown.Item>
                ))}
              </div>
            </Dropdown.Content>
          </Dropdown>

          {selectedProvince && (
            <Dropdown>
              <Dropdown.Trigger label={selectedRegency.name || 'Select City'} />
              <Dropdown.Content>
                <div className="p-2">
                  {regencies.map((regency) => (
                    <Dropdown.Item
                      key={regency.id}
                      value={regency.id}
                      onClick={() => handleRegencyChange(regency.id)}
                    >
                      {regency.name}
                    </Dropdown.Item>
                  ))}
                </div>
              </Dropdown.Content>
            </Dropdown>
          )}

          {selectedRegency && (
            <Dropdown>
              <Dropdown.Trigger label={selectedDistrict.name || 'Select District'} />
              <Dropdown.Content>
                <div className="p-2">
                  {districts.map((district) => (
                    <Dropdown.Item
                      key={district.id}
                      value={district.id}
                      onClick={() => handleDistrictChange(district.id)}
                    >
                      {district.name}
                    </Dropdown.Item>
                  ))}
                </div>
              </Dropdown.Content>
            </Dropdown>
          )}

          {selectedDistrict && (
            <Dropdown>
              <Dropdown.Trigger label={selectedVillage.name || 'Select Subdistrict'} />
              <Dropdown.Content>
                <div className="p-2">
                  {villages.map((village) => (
                    <Dropdown.Item
                      key={village.id}
                      value={village.id}
                      onClick={() => handleVillageSelect(village)}
                    >
                      {village.name}
                    </Dropdown.Item>
                  ))}
                </div>
              </Dropdown.Content>
            </Dropdown>
          )}

            {showNextStep && (
                <div>
                    <Link
                        href={route('subscriptions.index')}
                    >
                        <button
                            className="bg-indigo-500 text-white px-4 py-2 rounded mt-4"
                        >
                            Next Step
                        </button>
                    </Link>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
