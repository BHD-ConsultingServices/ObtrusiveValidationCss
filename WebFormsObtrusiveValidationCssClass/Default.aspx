<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="WebFormsObtrusiveValidationCssClass.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <style type="text/css">
        input[type='text'] {
            border: 1px solid #ccc;
            background-color: #fff;
            margin: 2px;
        }

            input[type='text'].validationError {
                background-color: #FCCFCF;
                border-color: #f46666;
            }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <asp:ScriptManager runat="server">
                <Scripts>
                    <asp:ScriptReference Name="WebForms.js" Assembly="System.Web" Path="~/Scripts/WebForms/WebForms.js" />
                    <asp:ScriptReference Name="WebUIValidation.js" Assembly="System.Web" Path="~/Scripts/WebForms/WebUIValidation.js" />
                    <asp:ScriptReference Name="Focus.js" Assembly="System.Web" Path="~/Scripts/WebForms/Focus.js" />

                    <asp:ScriptReference Path="~/Scripts/jquery-1.9.1.js" />
                    <asp:ScriptReference Path="~/Scripts/jquery.validationHook.js" />
                </Scripts>
            </asp:ScriptManager>
            
            <asp:TextBox runat="server" ID="Group1" ValidationGroup="Group1" />
            <asp:RequiredFieldValidator runat="server" ControlToValidate="Group1" ValidationGroup="Group1" ErrorMessage="* Group1 RFV" Display="Dynamic" />
            <asp:CustomValidator runat="server" ControlToValidate="Group1" ValidateEmptyText="True" ValidationGroup="Group1" ErrorMessage="* Group1 AlwaysFail" Display="Dynamic" ClientValidationFunction="AlwaysFail" />
            <%-- Always pass after failure (ensure we are not using last validator state --%>
            <asp:CustomValidator runat="server" ControlToValidate="Group1" ValidateEmptyText="True" ValidationGroup="Group1" ErrorMessage="* Group1 AlwaysPass" Display="Dynamic" ClientValidationFunction="AlwaysPass" />
            <br />
            <asp:TextBox runat="server" ID="Group1DynamicUpdate" ValidationGroup="Group1" />
            <asp:RequiredFieldValidator runat="server" ControlToValidate="Group1DynamicUpdate" ValidationGroup="Group1" ErrorMessage="* Group1 RFV" Display="Dynamic" />

            <br />

            <asp:TextBox runat="server" ID="Group2" ValidationGroup="Group2" />
            <asp:RequiredFieldValidator runat="server" ControlToValidate="Group2" ValidationGroup="Group2" ErrorMessage="* Group2 RFV" Display="Dynamic" />
            <asp:CustomValidator runat="server" ControlToValidate="Group2" ValidateEmptyText="True" ValidationGroup="Group2" ErrorMessage="* Group2 AlwaysFail" Display="Dynamic" ClientValidationFunction="AlwaysFail" />

            <br />

            <asp:TextBox runat="server" ID="NoGroup" />
            <asp:RequiredFieldValidator runat="server" ControlToValidate="NoGroup" ErrorMessage="* [No group] RFV" Display="Dynamic" />
            <asp:CustomValidator runat="server" ControlToValidate="NoGroup" ValidateEmptyText="True" ErrorMessage="* [No group] AlwaysFail" Display="Dynamic" ClientValidationFunction="AlwaysFail" />

            <br />

            <asp:TextBox runat="server" ID="None" ValidationGroup="None" />
            
            <br />
            <br />

            <asp:Button runat="server" Text="Group1" ValidationGroup="Group1" />
            <asp:Button runat="server" Text="Group2" ValidationGroup="Group2" />
            <asp:Button runat="server" Text="[No group]" />
            <asp:Button runat="server" Text="Pass" ValidationGroup="Pass" />
            <asp:Button runat="server" Text="No validators" ValidationGroup="DoesNotExist" />

            <script type="text/javascript">
                function AlwaysFail(src, args) {
                    args.IsValid = false;
                }

                function AlwaysPass(src, args) {
                    args.IsValid = true;
                }
            </script>
        </div>
    </form>
</body>
</html>