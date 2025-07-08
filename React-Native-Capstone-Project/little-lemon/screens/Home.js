import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Hero from '../components/Hero';
import InputText from '../components/InputText';
import { TextInput } from 'react-native-paper';
import {
  initDatabase,
  fetchFromDatabase,
  fetchAndStoreRemoteMenu,
  getUniqueCategories,
  queryFilteredMenu,
} from '../utils/db';
import useDebounce from '../utils/useDebounce';

const imageBaseUrl = 'https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/';

const Home = () => {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 300);
  const [menuData, setMenuData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const initMenuData = async () => {
      await initDatabase();
      const localData = await fetchFromDatabase();
      if (localData.length === 0) {
        const apiData = await fetchAndStoreRemoteMenu();
        setMenuData(apiData);
        setCategories(await getUniqueCategories(apiData));
        setFilteredData(apiData);
      } else {
        setMenuData(localData);
        setCategories(await getUniqueCategories(localData));
        setFilteredData(localData);
      }
    };
    initMenuData();
  }, []);

  useEffect(() => {
    const fetchFilteredResults = async () => {
      const result = await queryFilteredMenu(debouncedSearchText, selectedCategories);
      setFilteredData(result);
    };
    fetchFilteredResults();
  }, [debouncedSearchText, selectedCategories, menuData]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardTextContainer}>
        <View style={{flex: 1}}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
        </View>
        <Text style={styles.itemPrice}>${item.price}</Text>
      </View>
      <Image
        source={{ uri: `${imageBaseUrl}${item.image}?raw=true` }}
        style={styles.image}
        resizeMode="cover"
        backgroundColor="#000"
      />
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {!isSearchFocused && searchText.length === 0 && <Hero />}
      <View style={styles.searchInputContainer}>
          <InputText
          value={searchText}
          onChangeText={setSearchText}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          placeholder='Search menu'
          mode='outlined'
          outlineColor='#495e57'
          left={<TextInput.Icon icon="magnify" />}
          theme={{ roundness: 16 }}
          />
      </View>
      <View style={styles.categoryContainer}>
        {categories.map((cat) => {
          const isActive = selectedCategories.includes(cat);

          return (
            <TouchableOpacity
              key={cat}
              onPress={() => {
                if (isActive) {
                  setSelectedCategories(selectedCategories.filter(c => c !== cat));
                } else {
                  setSelectedCategories([...selectedCategories, cat]);
                }
              }}
            >
              <Text style={[styles.category, isActive && styles.categoryActive]}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id?.toString() || item.name}
        contentContainerStyle={{ paddingBottom: 50 }}
      />
    </KeyboardAvoidingView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  searchInputContainer: {
    backgroundColor: '#495e57',
    padding: 16,
    paddingBottom: 24,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    padding: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#f4f4f4'
  },
  category: {
    backgroundColor: '#EDEFEE',
    color: '#495E57',
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
    fontSize: 16,
    fontFamily: 'Karla',
    fontWeight: '900',
  },
  categoryActive: {
    backgroundColor: '#495E57',
    color: '#fff',
  },
  card: {
    flexDirection: 'row',
    gap: 16,
    marginVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  cardTextContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexShrink: 1,
  },
  itemName: {
    fontSize: 18,
    fontFamily: 'Karla',
    fontWeight: '700',
  },
  itemDescription: {
    fontSize: 16,
    color: '#495E57',
    marginVertical: 8,
  },
  itemPrice: {
    fontSize: 18,
    color: '#495E57',
    fontFamily: 'Karla',
    fontWeight: '500',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
});