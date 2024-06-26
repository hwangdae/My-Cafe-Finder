export interface PlacesType {
    data: PlaceType[];
  }

export interface PlaceType {
    address_name: string;
    category_group_code: string;
    category_group_name: string;
    category_name: string;
    distance: string;
    id: string;
    phone: string;
    place_name: string;
    place_url: string;
    road_address_name: string;
    x: string;
    y: string;
  }

  export interface TabMenuType {
    id : number;
    name : string;
    href : string
  }