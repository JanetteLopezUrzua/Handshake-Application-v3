import { gql } from "apollo-boost";

const getCompanyBasicInfoQuery = gql`
  query($id: ID) {
    company(id: $id) {
      location
      description
    }
  }
`;

const getCompanyContactInfoQuery = gql`
  query($id: ID) {
    company(id: $id) {
      email
      phonenumber
    }
  }
`;

const getCompanyPictureInfoQuery = gql`
  query($id: ID) {
    company(id: $id) {
      name
      photo
    }
  }
`;

// const getBooksQuery = gql`
//     {
//         books {
//             name
//             id
//         }
//     }
// `;

export {
  getCompanyBasicInfoQuery,
  getCompanyContactInfoQuery,
  getCompanyPictureInfoQuery,
};
