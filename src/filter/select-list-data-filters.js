filterList(searchQuery) {
  searchQuery = searchQuery?.toLowerCase()
  
  // Hanlde DataSource as array of objects
  if (this.itemIdProp || this.itemNameProp) {
    this.filteredDataSource = this.dataSource
      .filter(i => i[this.itemIdProp]?.toLowerCase().includes(searchQuery) ||
                   i[this.itemNameProp]?.toLowerCase().includes(searchQuery))
  } 
  else { // Handle DataSource passed as array of strings
    this.filteredDataSource = this.dataSource
      .filter(i => i.toLowerCase().includes(searchQuery))
  }
  console.log(this.filteredDataSource)
},