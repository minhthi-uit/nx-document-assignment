# Document Management Assignment

1. **Clone the Repository**
   ```bash
   git clone https://github.com/kamilabs-ai/nx-document-assignment.git
   cd nx-document-assignment
   ```
2. **Install Dependencies**

   ```bash
   pnpm install

   # run client and server apps
   pnpm start

   # run tests
   pnpm test
   ```

## **Description:**

Build a **lightweight internal document management system** that allows users to organize, search, and access documents efficiently.

### **Core Features**

- **Browse folders and view documents inside folders.**
- **Create, edit, and delete documents within folders.**
- **Search for documents by title.**
- **Keep track of recently viewed documents for easy access.**

### **Optional (Bonus)**

- **Support Markdown formatting** for viewing documents in a formatted style.
- **Basic UI styling** with Tailwind, MUI, or any other approach.

---

## **Requirements:**

- The app must have a **simple, user-friendly UI** with intuitive navigation.
- Users should be able to **create, edit, and delete documents** inside folders.
  - **When creating a document, users must manually input plain text.**
- The app should allow users to **search for documents** by their title.
- **Recently viewed documents** should be saved and displayed for quick access.
- API calls should be **efficient and properly handled**, with error messages and loading states.

## **Optional Features (Bonus Points)**:

- Use **any styling approach** (or none). Options: Tailwind, MUI, Styled Components, etc.
- Write **a couple of tests**—2 or 3 should be enough. No need for full test coverage.
- **(Bonus) Support for Markdown rendering when viewing documents.**
  - Users can enter plain text with Markdown syntax (e.g., # Heading, **bold**, - list item).
  - The app should render Markdown as formatted content when viewing the document.
  - If Markdown is not implemented, the app should display the content as plain text.

## Server / API

The server application is available at `http://localhost:4000/api` when you run `pnpm start`.

Please see the [API docs here](./server/README.md).

## **Submitting Your Solution**

1. **Source Code:**

   - Provide a public GitHub repository with all frontend source code.
   - Your submission should include:
     - All **React and TypeScript files** (for the frontend).
     - Any **assets, configurations, and dependencies** required to run the application.
   - The backend is already provided, so candidates only need to implement the frontend.

2. **Live Link (Optional):**
   - You can deploy the website on a hosting platform (e.g., Vercel, Netlify) and provide the live link.
   - This allows reviewers to test your application directly.

## **Using AI Tools (Encouraged!)**

We encourage you to leverage AI tools (e.g., GitHub Copilot, ChatGPT, Tabnine) to improve efficiency, code quality, and problem-solving. However, ensure that you **understand and can explain** all the code you submit.

## **Evaluation Criteria**

Your submission will be assessed based on the following key factors:

### **1. Core Functionality (70%)**

- Does the document management system work correctly?
- Can users **create, edit, delete, and search for documents**?
- Does the history of **recently viewed documents** persist correctly?
- Is the **UI/UX user-friendly, visually appealing, and intuitive to use**?

### **2. Code Quality & Best Practices (20%)**

- Is the code **clean, well-structured, and maintainable**?
- Are **React best practices** followed (component reusability, separation of concerns, proper state handling)?
- Are asynchronous calls (**API requests**) **handled correctly** with proper error handling?

### **3. Optional Enhancements (10%)**

- Has the developer implemented **basic styling** for a user-friendly UI?
- Has the developer added **basic tests** (if any) to validate core features?
- **(Bonus) If Markdown support is implemented, does it work correctly?**
