import wx

class MyFrame(wx.Frame):
    def __init__(self):
        super().__init__(None, title="Policy Data", size=(800,600))
        self.panel = wx.Panel(self)

        # load_label = wx.StaticText(self.panel, label="Load Policy Data")
        load_text_label = wx.StaticText(self.panel, label="Please enter policy numbers, one on each line. Do not include any commas, spaces, or special characters.")
        load_textbox = wx.TextCtrl(self.panel, style=wx.TE_MULTILINE)
        # self.load_textbox.Bind(wx.EVT_CHAR, self.OnLoadChar) # only allow numbers
        retrieve_button = wx.Button(self.panel, label="Retrieve")
        retrieve_button.Bind(wx.EVT_BUTTON, self.OnRetrieveClicked)
        # self.retrieve_button.Disable()  

        # create the results section with a wxListCtrl
        results_label = wx.StaticText(self.panel, label="RESULTS")
        self.results_listctrl = wx.ListCtrl(self.panel, style=wx.LC_REPORT)
        self.results_listctrl.InsertColumn(0, "PolicyNumber")
        self.results_listctrl.InsertColumn(1, "Type")
        self.results_listctrl.InsertColumn(2, "OnsetOffset")
        self.results_listctrl.InsertColumn(3, "Date")
        self.results_listctrl.InsertColumn(4, "HistoryID")
        self.results_listctrl.InsertColumn(5, "Staging")
        self.results_listctrl.InsertColumn(6, "NPPS")
        self.results_listctrl.InsertColumn(7, "TriggerID")
        self.results_listctrl.SetColumnWidth(0, 100)
        self.results_listctrl.SetColumnWidth(1, 100)
        self.results_listctrl.SetColumnWidth(2, 100)
        self.results_listctrl.SetColumnWidth(3, 100)
        self.results_listctrl.SetColumnWidth(4, 100)
        self.results_listctrl.SetColumnWidth(5, 100)
        self.results_listctrl.SetColumnWidth(6, 100)
        self.results_listctrl.SetColumnWidth(7, 100)
        
        # create a sizer for the load section
        load_sizer = wx.BoxSizer(wx.VERTICAL)
        # load_sizer.Add(load_label, 0, wx.ALL, 5)
        load_sizer.Add(load_text_label, 0, wx.ALL, 5)
        
        button_sizer = wx.BoxSizer(wx.HORIZONTAL)
        button_sizer.Add(load_textbox, 1, wx.EXPAND|wx.ALL, 5)
        button_sizer.Add(retrieve_button, 1, wx.ALIGN_RIGHT|wx.ALL, 5)
        load_sizer.Add(button_sizer, wx.EXPAND|wx.ALL)
        
        # create a sizer for the results section
        results_sizer = wx.BoxSizer(wx.VERTICAL)
        results_sizer.Add(results_label, 0, wx.ALL, 5)
        results_sizer.Add(self.results_listctrl, 1, wx.EXPAND|wx.ALL, 5)
        
        # create a sizer for the entire panel
        main_sizer = wx.BoxSizer(wx.VERTICAL)
        main_sizer.Add(load_sizer, 1, wx.EXPAND|wx.ALL, 10)
        main_sizer.Add(results_sizer, 1, wx.EXPAND|wx.ALL, 10)
        
        # set the sizer for the panel
        self.panel.SetSizer(main_sizer)
        
    def OnLoadChar(self, event):
        keycode = event.GetKeyCode()
        if keycode < wx.WXK_SPACE or keycode == wx.WXK_DELETE or keycode > 255:
            event.Skip()
            return
        if chr(keycode).isdigit():
            event.Skip()
        else:
            return
    
    def OnRetrieveClicked(self, event):
        pass


if __name__ == "__main__":
    app = wx.App()
    frame = MyFrame()
    frame.Show()
    app.MainLoop()
