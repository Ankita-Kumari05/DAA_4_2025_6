#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;
class Solution {
  public:
    bool canpaint(int s,vector<int>& arr,int k)
    {
        int painters=1;
        int current=0;
        for(int i=0;i<arr.size();i++)
        {
            if(current+arr[i]<=s)
            {
                current=current+arr[i];
            }
            else
            {
                current=arr[i];
                painters++;
                if(painters>k)
                {
                    return false;
                }
            }
        }
        return true;
    }
    int minTime(vector<int>& arr, int k) {
        int low=*max_element(arr.begin(),arr.end());
        int high=accumulate(arr.begin(),arr.end(),0);
        int ans=high;
        while(low<=high)
        {
            int mid=low+(high-low)/2;
            if(canpaint(mid,arr,k))
            {
                ans=mid;
                high=mid-1;
            }
            else
            {
                low=mid+1;
            }
        }
        return ans;
    }
};