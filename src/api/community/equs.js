import request from '@/utils/request'

export function getBuildingsById(communityId) {
  return request({
    url: '/community/baseBuilding/findAllBuildingByCommunityId',
    method: 'get',
    params: {
      communityId
    }
  })
}

export function getUnitsById(communityId, buildingId) {
  return request({
    url: '/community/baseUnit/findAllUnitByCommunityIdAndBuildingId',
    method: 'get',
    params: {
      communityId,
      buildingId
    }
  })
}

export function getHousesById(communityId, buildingId, unitId) {
  return request({
    url: '/community/house/page',
    method: 'get',
    params: {
      houseCode: communityId,
      buildingCode: buildingId,
      unitCode: unitId
    }
  })
}