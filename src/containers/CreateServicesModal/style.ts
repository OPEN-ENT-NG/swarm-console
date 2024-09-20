import { centerBoxStyle, flexEndBoxStyle } from "@/core/style/boxStyles";
import theme from "@/core/style/theme";

export const blueDividerStyle = {
  backgroundColor: theme.palette.primary.main,
  width: "2px",
};
export const checkBoxWrapperStyle = {
  ...centerBoxStyle,
  cursor: "pointer",
  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.01)" },
  height: "100%",
};

export const noHoverCheckBoxStyle = {
  "&:hover": { bgcolor: "transparent" },
  "& .MuiSvgIcon-root": {
    "&:hover": { bgcolor: "transparent" },
  },
};

export const checkBoxLabelStyle = {
  ...centerBoxStyle,
  gap: ".5rem",
  height: "1.25rem",
  userSelect: "none",
};

export const serviceStackStyle = {
  width: "100%",
  height: "4rem",
};

export const suppressDateTypographyStyle = {
  paddingTop: "1.5rem",
};

export const actionButtonsBoxStyle = {
  ...flexEndBoxStyle,
  gap: "1rem",
  marginTop: "2rem",
};

export const supressDateWrapperStyle = { ...centerBoxStyle, gap: ".5rem" };
export const sfcw = {
  "globalInfos": {
    "totalUsers": 2,
    "structures": [
      {
        "id": "0123456Z",
        "externalId": "42",
        "name": "Emile ZOLA"
      }
    ],
    "classes": [
      {
        "id": "42$1TES 2",
        "name": "1TES 2"
      }
    ],
    "groups": null,
    "users": [
      {
        "id": "lundy.monjeau",
        "firstName": "Lundy",
        "lastName": "MONJEAU",
        "structureNodes": null
      },
      {
        "id": "student.test",
        "firstName": "Student",
        "lastName": "TEST",
        "structureNodes": null
      }
    ]
  },
  "filteredUsers": [
    {
      "structures": [
        {
          "id": "0123456Z",
          "externalId": "42",
          "name": "Emile ZOLA"
        }
      ],
      "classes": [
        {
          "id": "42$1TES 2",
          "name": "1TES 2"
        }
      ],
      "groups": null,
      "services": [
        {
          "id": "c5e4328d-9fb1-4c2a-94cd-82dbd27cab50",
          "userId": "lundy.monjeau",
          "firstName": "Lundy",
          "lastName": "MONJEAU",
          "serviceName": "/wp-c5e4328d-9fb1-4c2a-94cd-82dbd27cab50",
          "structureId": "42",
          "type": "WORDPRESS",
          "created": "2024-09-19T13:26:44.475+00:00",
          "deletionDate": "2024-10-10T00:00:00.000+00:00",
          "state": "SCHEDULED"
        }
      ]
    },
    {
      "structures": [
        {
          "id": "0123456Z",
          "externalId": "42",
          "name": "Emile ZOLA"
        }
      ],
      "classes": [
        {
          "id": "42$1TES 2",
          "name": "1TES 2"
        }
      ],
      "groups": null,
      "services": [
        {
          "id": "473eb15a-a0ba-4bd6-b8a0-535fc29b8060",
          "userId": "student.test",
          "firstName": "Student",
          "lastName": "TEST",
          "serviceName": "/wp-473eb15a-a0ba-4bd6-b8a0-535fc29b8060",
          "structureId": "42",
          "type": "WORDPRESS",
          "created": "2024-09-19T13:26:44.480+00:00",
          "deletionDate": "2024-10-10T00:00:00.000+00:00",
          "state": "SCHEDULED"
        }
      ]
    }
  ]
}
