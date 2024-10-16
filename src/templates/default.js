/** @param {import("../type.ts").data} data */
export const template = (data) => `
<div style="
  background-color: #dddddd;
  border-radius: 2rem;
  height: 100%; 
  width: 100%; 
  display: flex; 
  flex-direction: column;
  justify-content: center;
  align-items: center;
">
  <h1 style="
    font-size: 6rem;
  ">${data.title}</h1>
  <p>${data?.description}</p>
  <p>
    ${data.tags.join(", ")}
  </p>
</div>
`;
